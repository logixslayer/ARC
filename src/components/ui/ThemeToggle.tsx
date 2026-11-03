import { Laptop, Moon, Sun, type LucideIcon } from "lucide-react";
import { useTheme, type ThemePreference } from "../../app/ThemeContext";

const options: Array<{ value: ThemePreference; label: string; Icon: LucideIcon }> = [
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
  { value: "system", label: "System", Icon: Laptop },
];

export function ThemeToggle() {
  const { preference, setPreference } = useTheme();
  return (
    <div className="theme-toggle" role="group" aria-label="Theme preference">
      {options.map(({ value, label, Icon }) => (
        <button
          className={`theme-option${preference === value ? " selected" : ""}`}
          key={value}
          type="button"
          aria-pressed={preference === value}
          onClick={() => setPreference(value)}
        >
          <Icon size={15} aria-hidden="true" />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}
