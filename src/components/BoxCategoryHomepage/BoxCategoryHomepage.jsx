import { Button } from "../ui/button";

export default function BoxCategoryHomepage(props) {
  const { imageUrl,categoryName } = props;
  return (
    <div className="rounded-3xl bg-neutral-100 pb-6">
      <img
        src={imageUrl}
        alt="img"
        className="h-full w-full rounded-3xl object-cover"
      />
      <h1 className="flex items-center justify-center py-4 text-3xl font-semibold">
        {categoryName}
      </h1>
      <div className="flex justify-center">
        <Button className="p-5 text-xl" variant="more">
          Xem thêm
        </Button>
      </div>
    </div>
  );
}
