import { Cascader, CascaderProps } from "antd";
interface Option {
  value: string;
  label: string;
  children?: Option[];
}
type SelectInputProps = CascaderProps & {
  options?: Option[];
  onChange: (v: (string | number)[][]) => void;
};
// const options: Option[] = [

// ];
function SelectInput(props: SelectInputProps) {
  return (
    <Cascader
      multiple
      maxTagCount="responsive"
      showSearch
      style={{ width: "100%", borderColor: "red" }}
      {...props}
    />
  );
}

export default SelectInput;
