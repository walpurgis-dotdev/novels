export function ViewMonth({ data, type }) {
  return (
    <>
      {data && data.length > 0 ? (
        <div>
          {data.map((item) => (
            <div key={item.id}>{item.title}</div>
          ))}
        </div>
      ) : (
        <div>Không có dữ liệu</div>
      )}
    </>
  );
}
