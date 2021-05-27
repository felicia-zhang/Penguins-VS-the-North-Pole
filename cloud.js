handlers.addUserVirtualCurrency = function (args, context) {
    var amount = args.amount;
    var virtualCurrency = args.virtualCurrency;
    var request = {
        PlayFabId: currentPlayerId, 
        VirtualCurrency: virtualCurrency,
        Amount: amount
    };
    server.AddUserVirtualCurrency(request);
    return;
};

handlers.syncInventoryToCatalog = function (args, context) {
    var catalogItems = server.GetCatalogItems({CatalogVersion: 1}).Catalog
    var itemInstances = server.GetUserInventory({PlayFabId: currentPlayerId}).Inventory
    var itemIdToInstanceIds = {}
    itemInstances.forEach((instance) => {
        itemIdToInstanceIds[instance.ItemId] = itemIdToInstanceIds[instance.ItemId] || []
        itemIdToInstanceIds[instance.ItemId].push(instance.ItemInstanceId)
    })

    catalogItems.forEach((item) => {
        if (item.ItemId in itemIdToInstanceIds) {
            itemIdToInstanceIds[item.ItemId].forEach((instanceId) => {
                var request = {
                    ItemInstanceId: instanceId,
                    PlayFabId: currentPlayerId,
                    Data: {"Description": item.Description, "image": JSON.parse(item.CustomData)['image']}
                }
                server.UpdateUserInventoryItemCustomData(request);
            })
        }
    })
    return;
};
