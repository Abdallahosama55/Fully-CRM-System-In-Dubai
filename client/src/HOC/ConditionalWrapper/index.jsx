const ConditionalWrapper = ({ condition, Wrapper, children }) => {
    if (typeof Wrapper === 'array') {
        return ApplyWrappers({ wrappers: Wrapper, children })
    }

    if (typeof Wrapper === 'function') {
        return condition ? <Wrapper>{children}</Wrapper> : children;
    }

    return children;
}

const ApplyWrappers = ({ wrappers, children }) => wrappers.reduce(
    (children, Wrapper) => Wrapper ? <Wrapper>{children}</Wrapper> : children, children
);

export default ConditionalWrapper;