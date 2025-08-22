import React from "react";
import md5 from "blueimp-md5";

function Gravatar({ email, size = 40 }) {
  if (!email) return null;

  const hash = md5(email.trim().toLowerCase());
  const gravatarUrl = `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;

  return (
    <img
      src={gravatarUrl}
      alt="User Avatar"
      className="w-10 h-10 rounded-full"
    />
  );
}

export default Gravatar;
