import React, { useRef, ForwardedRef } from "react";

const formStyle: React.CSSProperties = {
  margin: "0 auto",
  padding: "10px",
  border: "1px solid #c9c9c9",
  borderRadius: "5px",
  background: "white",
  width: "220px",
};

const labelStyle: React.CSSProperties = {
  margin: "10px 0 5px 0",
  fontFamily: "Arial, Helvetica, sans-serif",
  fontSize: "15px",
};

const inputStyle: React.CSSProperties = {
  margin: "",
  border: "1px solid #bfbfbf",
  borderRadius: "3px",
  padding: "5px",
  boxSizing: "border-box",
  width: "100%",
  height: "30%",
};

const submitStyle: React.CSSProperties = {
  margin: "10px 0 0 0",
  padding: "2px 2px",
  border: "1px solid #efffff",
  borderRadius: "3px",
  background: "#3085d6",
  width: "100%",
  fontSize: "15px",
  color: "white",
  display: "block",
};

type FieldProps = {
  label: string;
  type: string;
};

export type UserData = {
  usernameRef: React.RefObject<HTMLInputElement>;
  passwordRef: React.RefObject<HTMLInputElement>;
};
export type LogInProps = {
  onSubmit: (data: UserData) => void;
};
const Field = React.forwardRef(
  ({ label, type }: FieldProps, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <div>
        <label style={labelStyle}>{label}</label>
        <input ref={ref} type={type} style={inputStyle} />
      </div>
    );
  }
);

export const LogIn: React.FC<LogInProps> = ({ onSubmit }) => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameRef.current && passwordRef.current) {
      const data: UserData = {
        usernameRef: usernameRef,
        passwordRef: passwordRef,
      };
      onSubmit(data);
    }
    alert(` Log In !`);
  };

  return (
    <form style={formStyle} onSubmit={handleSubmit}>
      <Field ref={usernameRef} label="User Name:" type="text" />
      <Field ref={passwordRef} label="Password:" type="password" />
      <div>
        <button style={submitStyle} type="submit">
          Log In
        </button>
      </div>
    </form>
  );
};

export default LogIn;
