declare module "react-quill-new" {
  import * as React from "react";

  export interface ReactQuillProps {
    value?: string;
    defaultValue?: string;
    onChange?: (
      content: string,
      delta: any,
      source: string,
      editor: any
    ) => void;
    readOnly?: boolean;
    theme?: string;
    placeholder?: string;
    modules?: Record<string, any>;
    formats?: string[];
    className?: string;
    style?: React.CSSProperties;
  }

  export default class ReactQuill extends React.Component<ReactQuillProps> {}
}
