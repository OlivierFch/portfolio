const Tag = ({ tagLabel }: { tagLabel: string }) => {
    return (
        <span
            className="px-3 py-1 text-xs border border-border rounded-full hover:border-muted-foreground/50 transition-colors duration-300"
        >
            {tagLabel}
        </span>
    );
};

export { Tag };
