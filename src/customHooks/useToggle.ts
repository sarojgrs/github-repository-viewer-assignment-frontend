import { useState } from "react";

const useToggle = (initialValue = false): [boolean, () => void] => {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = () => {
    setValue((prevValue) => !prevValue);
  };

  return [value, toggle];
};

export default useToggle;
