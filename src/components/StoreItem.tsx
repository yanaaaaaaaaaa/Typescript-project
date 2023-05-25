import { Button, Card } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import { useState } from "react";

type StoreItemProps = {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
  rating: {
    rate: number
    count: number
  }
};

export function StoreItem({ id, title, price, image, description, rating, category }: StoreItemProps) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();
  const quantity = getItemQuantity(id);
  const [details, setDetails] = useState(false);

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={image}
        height="200px"
        style={{ objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-3">{title}</span>
          <span className="ms-2 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        <div className="mt-auto">
          <Button
          variant="success"
            className="w-100"
            onClick={() => setDetails((prev) => !prev)}
          >
            {details ? "Спрятать подробности" : "Увидеть подробности"}
          </Button>
          {details && (
            <div className="mt-2">
              <p>{description}</p>
              <p className="fs-5">
                Категория:{" "}
                <span style={{ fontWeight: "bold" }}>
                  {category}
                </span>
              </p>
              <p className="fs-5">
                Рейтинг:{" "}
                <span style={{ fontWeight: "bold" }}>
                  {rating?.rate}
                </span>
              </p>
            </div>
          )}
        </div>
        <div className="mt-2">
          {quantity === 0 ? (
            <Button className="w-100" onClick={() => increaseCartQuantity(id)}>
              + Добавить в корзину
            </Button>
          ) : (
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: ".5rem" }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: ".5rem" }}
              >
                <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                <div>
                  <span className="fs-3">{quantity}</span>
                </div>
                <Button onClick={() => increaseCartQuantity(id)}>+</Button>
              </div>
              <Button
                onClick={() => removeFromCart(id)}
                variant="danger"
                size="sm"
              >
                Удалить
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
