import { useEffect, useState } from "react";
import { createSignal, signalEffect } from "../utilities/signal.utility";

const store = createSignal({
  files: [] as File[],
});

const handleRemove = (name: string) => {
  store.value.files = store.value.files.filter((file) => file.name !== name);
};

const convertFileToURL = (file: File) => {
  return new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  });
};

signalEffect(() => {
  store.value.files;
  console.log("store.value.files", store.peek().files);
});

const FilesExample = () => {
  const files = store.useSelector((value) => value.files);
  const [display, setDisplay] = useState(new Map<string, string>());

  useEffect(() => {
    files.forEach(async (file) => {
      if (display.has(file.name)) return;

      const url = await convertFileToURL(file);
      setDisplay((display) => new Map(display.set(file.name, url)));
    });
  }, [files]);

  return (
    <div>
      <h1>Files Example</h1>
      <ul>
        {files.map((file) => (
          <li key={file.name}>
            <span>{file.name}</span>
            <button onClick={() => handleRemove(file.name)}>X</button>
            <img
              src={display.get(file.name)}
              alt={file.name}
              width={100}
              height={100}
            />
          </li>
        ))}
      </ul>
      <input
        type="file"
        accept="image/*"
        onChange={(event) => {
          const files = event.target.files;
          if (files) {
            store.value.files = [...store.value.files, ...files];
          }
        }}
      />
    </div>
  );
};

export default FilesExample;
