// src/utils/formHandlers.ts
import { Dispatch, SetStateAction } from 'react';

export const handleSearchTermChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setSearchTerm: Dispatch<SetStateAction<string>>
) => {
  e.preventDefault();
  setSearchTerm(e.target.value);
};

export const handleFormSubmit = (
  e: React.FormEvent,
  setIsSubmitted: Dispatch<SetStateAction<boolean>>
) => {
  e.preventDefault();
  setIsSubmitted(true);
};
