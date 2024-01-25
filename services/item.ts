import ItemModel from '../model/item'

export default class ItemsService {

   public async GetMyItems(user:string): Promise<any[]> {
    return ItemModel.find({ owner: user }).populate({ path: 'owner', select: '-password -salt' }).exec();
    }
    
    public async GetItem(user:string): Promise<any[]> {
    return  ItemModel.find({ owner:user}).populate({ path: 'owner', select: '-password -salt' });
  
  
    
    }

}
