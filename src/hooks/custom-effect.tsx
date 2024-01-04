import { useRef } from "react";

type TCleanupCallback = () => void;
type TEffectCallback = () => TCleanupCallback | void;
type TDependencyList = readonly unknown[];

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
    cleanup.current = effect() || null;
    return;
  }

  const isDepsChanged = checkDependenciesChanged(prevDeps.current!, deps);

  if (isDepsChanged) {
    cleanup.current?.();
    cleanup.current = effect() || null;
  }

  prevDeps.current = deps;
};

export default useCustomEffect;
