import { Dispatch, SetStateAction, useState } from "react";

export const useError = <T>(): [
  T | null,
  boolean,
  (error: T) => void,
  Dispatch<SetStateAction<boolean>>
] => {
  const [error, setError] = useState<T | null>(null);
  const [isErrorVisible, setIsErrorVisible] = useState<boolean>(false);

  const handleError = (error: T) => {
    setError(error);
    setIsErrorVisible(true);
  };

  return [error, isErrorVisible, handleError, setIsErrorVisible];
};
