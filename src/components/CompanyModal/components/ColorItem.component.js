const colorArray = [];

export default function ColorItem(props) {
  const colorItems = props.colorData.map((label, color) => (
    <div className="color-grid-item" key={color.toString()} color={color}>
      {label}
    </div>
  ));
  return <div className="color-grid-container">{colorItems}</div>;
}
