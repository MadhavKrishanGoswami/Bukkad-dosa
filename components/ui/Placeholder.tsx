import clsx from "clsx";

interface PlaceholderProps {
    label: string;
    className?: string;
    height?: string;
}

export default function Placeholder({ label, className, height = "h-64" }: PlaceholderProps) {
    return (
        <div
            className={clsx(
                "flex flex-col items-center justify-center bg-gray-200 border-2 border-dashed border-gray-400 text-gray-500 font-mono text-sm p-4 w-full",
                height,
                className
            )}
        >
            <span className="font-bold text-lg mb-2 text-center break-words max-w-full">
                [{label}]
            </span>
            <span className="text-xs opacity-75">IMAGE PLACEHOLDER</span>
        </div>
    );
}
