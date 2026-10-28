export function joinClasses(...values) {
    return [
        ...new Set(
            values
                .filter(Boolean)
                .flatMap((value) => String(value).split(/\s+/))
                .filter(Boolean),
        ),
    ].join(' ');
}
