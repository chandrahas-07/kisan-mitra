function RoleBadge({ role }) {

  function getRoleStyles() {

    if (role === "Admin") {
      return "bg-red-500/20 text-red-400 border-red-500/30";
    }

    if (role === "Manager") {
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    }

    return "bg-green-500/20 text-green-400 border-green-500/30";
  }

  return (

    <span
      className={`
        px-4
        py-2
        rounded-xl
        border
        text-sm
        font-semibold
        ${getRoleStyles()}
      `}
    >
      {role}
    </span>

  );
}

export default RoleBadge;