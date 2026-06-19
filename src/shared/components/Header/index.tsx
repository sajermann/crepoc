import { Button } from "../Button";

type THeaderProps = {
  title: string;
  subtitle?: string;
  action?: {
    title: string;
    icon: React.ReactNode;
    iconPosition?: "left" | "right";
    disabled?: boolean;
    onClick: () => void;
  }[];
};

export function Header({ title, subtitle, action }: THeaderProps) {
  return (
    <header className="bg-white py-4 px-6 border-b border-gray-300 flex items-center justify-between">
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
              onClick={item.onClick}
              disabled={item.disabled}
            >
              {item.icon && (
                <div className="flex items-center justify-center gap-2">
                  {item.iconPosition === "left" ||
                    (!item.iconPosition && item.icon)}
                  {item.title}
                  {item.iconPosition === "right" && item.icon}
                </div>
              )}
              {!item.icon && item.title}
            </Button>
          ))}
        </div>
      )}
    </header>
  );
}
