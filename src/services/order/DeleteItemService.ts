import prismaClient from "../../prisma";

interface IItemRequest{
	item_id: string;
}

class DeleteItemService{
	async execute({ item_id }: IItemRequest) {
		
		const deleteItem = prismaClient.item.delete({
			where: {
				id: item_id
			}
		})

		return deleteItem;
	}
}

export { DeleteItemService }