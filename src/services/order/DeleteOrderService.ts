import prismaClient from "../../prisma";

interface IOrderRequest {
	order_id: string
}

class DeleteOrderService{
	async execute({ order_id }: IOrderRequest) {
		const orderDelete = prismaClient.order.delete({
			where: {
				id: order_id
			}
		})

		return orderDelete;
	}
}

export { DeleteOrderService }