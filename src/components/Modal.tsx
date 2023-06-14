import clsx from "clsx";
import React, {
  HTMLAttributes,
  createContext,
  useContext,
  useRef,
  useState,
} from "react";
import { useClickOutside } from "../hooks/useClickOutside";
import { IoClose } from "react-icons/io5";

type ModalProps = {
  children: React.ReactNode;
};

type ButtonProps = HTMLAttributes<HTMLButtonElement>;

type ContentProps = HTMLAttributes<HTMLDivElement>;

type ContextValue = {
  isOpen: boolean;
  toggle: () => void;
};

const ModalContext = createContext<ContextValue | undefined>(undefined);

export const Modal = ({ children }: ModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <ModalContext.Provider value={{ isOpen, toggle }}>
      {children}
    </ModalContext.Provider>
  );
};

export const ToggleButton = ({
  children,
  className,
  ...props
}: ButtonProps) => {
  const { toggle } = useToggle();
  return (
    <button className={className} onClick={toggle} {...props}>
      {children}
    </button>
  );
};

export const ModalContent = (props: ContentProps) => {
  const { isOpen } = useToggle();

  if (!isOpen) return null;
  return (
    <div className="backdrop">
      <ModalContentBase {...props} />
    </div>
  );
};

const ModalContentBase = ({ children, className }: ContentProps) => {
  const { toggle } = useToggle();
  const elRef = useRef<HTMLDivElement>(null);
  useClickOutside(elRef, toggle);

  return (
    <div ref={elRef} className={clsx("modal", className)}>
      <ToggleButton className="close">
        <IoClose size={25} />
      </ToggleButton>
      {children}
    </div>
  );
};

export const useToggle = () => {
  const value = useContext(ModalContext);
  if (!value) throw new Error("Please use context inside the provider");
  return value;
};
