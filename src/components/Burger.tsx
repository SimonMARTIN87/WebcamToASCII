

export interface BurgerProps {
  open: boolean;
  onClick: () => void;
}

export const Burger = (props: BurgerProps) => {
  const {open, onClick} = props;

  const className = "burger" + (open ? ' open':'');

  return (
    <div className={className} onClick={onClick}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  )

}