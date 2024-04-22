import PropTypes from "prop-types"

CardDirector.propTypes = {
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  estado: PropTypes.bool
};

export default function  CardDirector({ name, img, onClick, estado}){
  return (
    <div className="m-2 group relative hover:cursor-pointer duration-300 " onClick={onClick}>
      {!estado ? <div className="absolute flex justify-center items-center w-full bg-black opacity-50 h-full"><h1 className="text-2xl font-bold text-white">Deshabilitado</h1></div> :null }
      <div className={`w-[10rem] h-[15rem] rounded-lg overflow-hidden ${!estado ? "" : "group-hover:opacity-25 duration-300"}`}>
        <img
          src={img}
          alt={name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <h1 className="text-white text-center font-medium">{name}</h1>
    </div>
  );
}
