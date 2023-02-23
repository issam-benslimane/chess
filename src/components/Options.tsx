import React, { useState } from "react";
import { PieceColor, Player } from "../models/types";

type Prop = {
  color: PieceColor;
  player: Player;
};

const Options = ({ color, player }: Prop) => {
  const [type, setType] = useState(player);

  return (
    <div className={`p-4 rounded-md border-2 border-neutral-800 mt-3`}>
      <p className="text-xl mb-2 underline">{color} player:</p>
      <label className="text-lg flex gap-2 pl-2 items-center">
        Type:
        <select
          name="type"
          className="flex-1 p-2"
          value={type}
          onChange={(e) => setType(e.target.value as Player)}
        >
          <option value="computer" disabled>
            Computer
          </option>
          <option value="humain">Humain</option>
        </select>
      </label>
    </div>
  );
};

export default Options;
