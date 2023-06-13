import { ChangeEvent, KeyboardEvent, memo } from "react";

export type InputProps = {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  onClear: () => void;
};

export const Input = memo(
  ({ value, onChange, onSearch, onClear }: InputProps) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    };

    const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.code === "Enter") {
        onSearch();
      }
    };

    return (
      <div className="flex items-center justify-between py-3 px-4 border-b border-r w-80">
        <div className="relative">
          <input
            type="text"
            value={value}
            onChange={handleChange}
            onKeyUp={handleKeyUp}
            className="h-10 border px-4"
          />

          {Boolean(value.length) && (
            <div
              onClick={onClear}
              className="w-10 h-full border flex justify-center items-center cursor-pointer absolute right-0 top-0 "
            >
              x
            </div>
          )}
        </div>
        <div className="grow flex justify-center items-center">
          <button onClick={onSearch} className="bg-slate-300 p-2">
            Search
          </button>
        </div>
      </div>
    );
  }
);
