type BaseInputProps = {
  name: string;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  error?: string;
  requiredField?: boolean;
};

export type DateInputProps = BaseInputProps & {
  disabled?: boolean;
};

export type TextInputProps = BaseInputProps & {
  isRewardsBalance?: boolean;
  rewardsBalanceText?: string;
  length?: number;
  placeholder?: string;
  isCurrency?: boolean;
};

export type NumberInputProps = BaseInputProps & {
  isCurrency?: boolean;
  requiredField?: boolean;
  placeholder?: string;
};

export type SelectInputProps = BaseInputProps & {
  options: { value: string; text: string }[];
  bkgrdColor?: string;
  defaultOption?: string;
  disableDefaultOption?: boolean;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export type RadioInputProps = BaseInputProps & {
  inquiriesStatus:
    | {
        equifax: boolean;
        experian: boolean;
        transunion: boolean;
      }
    | undefined;
};

export type Errors = Record<string, string>;
