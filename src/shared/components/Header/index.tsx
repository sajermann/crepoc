import { Button } from "../Button";

type THeaderProps = {
  title: string;
  subtitle?: string;
  action?: {
    title: string;
    icon: React.ReactNode;
    onClick: () => void;
  }[];
};

export function Header({ title, subtitle, action }: THeaderProps) {
  return (
    <header className="py-4 px-6 border-b border-gray-300 flex items-center justify-between">
      <div className="flex flex-col gap-2">
        <span className="text-lg font-bold">{title}</span>
        {subtitle && <span className="text-xs text-gray-500">{subtitle}</span>}
      </div>
      {action && (
        <div>
          {action.map((item) => (
            <Button
              key={item.title}
              variant="outlined"
              startIcon={item.icon}
              containerIconsProps={{
                className: "flex items-center justify-center",
              }}
              color="mono"
              onClick={item.onClick}
            >
              {item.title}
            </Button>
          ))}
        </div>
      )}
    </header>
  );
}
