Whether we like it or not, React is one of the most popular JavaScript frameworks around.

And it plays a significant role in the everyday lives of many front-end web developers.

Being as popular as it is, you can imagine how many job positions require advanced knowledge of React and how it works.

Today we are going to be taking a look at how to implement one of React's most commonly used hooks, the "useEffect" hook from scratch.

Fair warning, this tutorial is only for people who are already familiar with React and how its basic elements behave.

### Understanding the task at hand

To implement a useEffect-like hook, we are going to need to take a look at all of the features that the real useEffect has and tackle them one by one.

These are the features that we need to implement:

A basic custom hook that accepts 2 arguments.

The first argument is an effect callback that accepts no arguments and returns either void or a cleanup function.

The second argument is the optional array of dependencies.

The effect callback is always called on the first render.

If the dependency array isn't provided, then the callback is triggered on all renders.

If there is a dependency array then the callback is only called when one or more of the dependencies change.

Finally, if a cleanup function is returned by the effect callback, it is called when the dependencies change before calling the effect callback and when the component unmounts.

This may sound like a lot, but practically it boils down to a few lines of code.

The only part that we cannot implement is calling the cleanup function when the component unmounts since React uses its internal engine to keep track of when components unmount and we don't have access to those internal methods.

### Getting started

Let's prepare the basic types and hook signature using TypeScript:

```tsx
type TCleanupCallback = () => void;
type TEffectCallback = () => TCleanupCallback | void;
type TDependencyList = readonly unknown[];

const useCustomEffect = (
  effect: TEffectCallback,
  deps?: TDependencyList
): void => {};
```

As you can see, we have defined the types for the effect callback, the cleanup callback, and the dependency list.

Now let's start with the first feature, calling the effect callback on the first render.

We need a flag to keep track of whether or not the component has rendered for the first time.

We could use the `useState`hook to keep track of our flag, but updating state will a re-render of the component when the flag is updated and that's not what we want so we need a different solution.

Luckily, in React we can use the useRef hook to keep track of values between renders. so let's use that:

```tsx
const useCustomEffect = (
  effect: TEffectCallback,
  deps?: TDependencyList
): void => {
  const isFirstRender = useRef(true);

  if (isFirstRender.current) {
    isFirstRender.current = false;
    effect();
    return;
  }
};
```

It's definitely a good start, but we still need have a long way to go.

Let's move on to the next feature, calling the effect callback on all renders if no dependency array is provided.

```tsx
if (!deps) {
  effect();
  return;
}
```

This is a pretty straightforward check, if there are no dependencies, we call the effect callback and return.

Now the next feature is a bit more complicated, we need to call the effect callback only when one or more of the dependencies change.

This means that we need to keep track of the previous dependencies and compare them to the current dependencies.

```tsx
const checkDependenciesChanged = (
  prevDeps: TDependencyList,
  deps: TDependencyList
): boolean => {
  if (prevDeps.length !== deps.length) {
    console.warn(
      "The length of the dependencies array must remain constistent between renders."
    );
  }

  return deps.some((dep, index) => {
    return !Object.is(dep, prevDeps[index]);
  });
};

const useCustomEffect = (
  effect: TEffectCallback,
  deps?: TDependencyList
): void => {
  const isFirstRender = useRef(true);
  const prevDeps = useRef(deps);

  if (isFirstRender.current) {
    isFirstRender.current = false;
    effect();
    return;
  }

  if (!deps) {
    effect();
    return;
  }

  const isDepsChanged = checkDependenciesChanged(prevDeps.current!, deps);

  if (isDepsChanged) {
    effect();
  }

  prevDeps.current = deps;
};

export default useCustomEffect;
```

We have added a helper function that checks if the dependencies have changed and we have also added a ref to keep track of the previous dependencies.

Similar to the real useEffect hook, we log a warning if the size of the dependency array changes.

We also use the `Object.is` function to compare the dependencies like the original useEffect hook in order to efficiently compare the dependencies whether they are primitive types or reference types.

Now we can check if the dependencies have changed and call the effect callback if they have.

The last feature that we need to implement is calling the cleanup function when the dependencies change, but before calling the effect callback.

This means that we need to store the cleanup callback from the previous render and callit before the effect if the dependencies change.

So lets put it all together and look at the finished result.

```tsx
const useCustomEffect = (
  effect: TEffectCallback,
  deps?: TDependencyList
): void => {
  const prevDeps = useRef(deps);
  const isFirstRender = useRef(true);
  const cleanup = useRef<TCleanupCallback | null>(null);

  if (isFirstRender.current) {
    isFirstRender.current = false;
    cleanup.current = effect() || null;
    return;
  }

  if (!deps) {
    cleanup.current?.();
    cleanup.current = effect();
    return;
  }

  const isDepsChanged = checkDependenciesChanged(prevDeps.current!, deps);

  if (isDepsChanged) {
    cleanup.current?.();
    cleanup.current = effect() || null;
  }

  prevDeps.current = deps;
};
```

And just like that we have created our very own useEffect hook.

I hope that this tutorial helps you understand how React and its ecosystem work.

As always, any input is appreciated.

Until next time...
