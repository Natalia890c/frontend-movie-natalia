import PropTypes from "prop-types";

CardGenero.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  estado: PropTypes.bool
};

export default function CardGenero({ name, img, onClick, estado }) {
  return (
    <div onClick={onClick} className="w-[30rem] h-[17rem] flex items-center justify-center relative rounded-lg overflow-hidden border-2 border-black border-opacity-30 m-2 group hover:cursor-pointer duration-300">
      <div className={`absolute w-full h-full flex justify-center items-center bg-black/60  duration-300 ${!estado ? "" : "group-hover:bg-black/75"}`}>
        <h1 className="text-3xl font-bold text-white/70">{name}</h1>
        {!estado ? <div className="absolute flex justify-center items-center w-full top-8 bg-black opacity-50 h-full"><h1 className="text-2xl font-bold text-white">Deshabilitado</h1></div> :null }
      </div>
      <img src={img} className="" alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
      {/* <div className="p-4 ">
        <h2 className="text-lg font-bold">{name}</h2>
        <p className="h-25 overflow-hidden max-h-12 my-4">{description}</p>
      </div> */}
    </div>
  );
}
