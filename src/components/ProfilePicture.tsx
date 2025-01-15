import { motion } from "framer-motion";
const ProfilePicture: React.FC<{
  src: string;
  x: number;
  y: number;
  visible: boolean;
}> = (props) => {
  const classes = `top-[${props.y}px] left-[${props.x}px] ${
    props.visible ? "visible" : "hidden"
  }`;

  return (
    <motion.div
      transition={{ delay: 100, type: "inertia" }}
      className={`${classes}  w-[128px] h-auto`}
    >
      <img src={props.src} className="w-[100%] h-[100%] object-fill" />
    </motion.div>
  );
};

export default ProfilePicture;
