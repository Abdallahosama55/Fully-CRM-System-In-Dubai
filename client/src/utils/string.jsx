function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  try {
    const nameParts = name.split(" ");
    const firstNameInitial = nameParts[0] ? nameParts[0][0] : "";
    const lastNameInitial = nameParts.length > 1 && nameParts[1] ? nameParts[1][0] : "";

    return {
      style: {
        fontSize: "18px",
        background: stringToColor(name),
      },
      icon: (
        <div>
          {firstNameInitial?.toUpperCase()}
          {lastNameInitial?.toUpperCase()}
        </div>
      ),
    };
  } catch (e) {
    return {};
  }
}

export { stringAvatar };
