Ext.define('peq.view.items.ItemsGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.itemsgrid',

    onAfterRender: function(e) {
        Util.attachResizeHandler(e, function() {
            e.setHeight(Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 36);
        });
        this.lookupReference('pagingtoolbartop').setStore(this.getStore('items'));
        Ext.data.StoreManager.lookup('itemsStore').load({params: {token: Ext.state.Manager.get('token'), page: 1}});
    },

    onColumnShow: function(gridHeader, column, opts) {
        var forceHidden = {}, dataIndex = column.config.dataIndex;
        forceHidden[dataIndex] = false;
        
        Util.grid.resetColumns(Ext.getCmp("itemsGrid-ID"), ['bagtype', 'bagsize', 'bagslots', 'bagwr'], forceHidden, true);
    },

    onColumnHide: function(gridHeader, column, opts) {
        var forceHidden = {}, dataIndex = column.config.dataIndex;
        forceHidden[dataIndex] = true;
        
        Util.grid.resetColumns(Ext.getCmp("itemsGrid-ID"), ['bagtype', 'bagsize', 'bagslots', 'bagwr'], forceHidden, true);
    },

    renderBold: function (value) {
        return "<strong>" + value + "</strong>";
    },

    renderBoolean: function (value) {
        if (parseInt(value)) {
            return "Yes";
        } else {
            return "No";
        }
    },

    renderPercent: function (value) {
        return value + "%";
    },

    renderIcon: function (value) {
        return '<img src="resources/icons/item_' + value + '.png" width="40" height="40" />';
    },

    renderLucyLink: function (value) {
        return value + ' (<a href="http://lucy.allakhazam.com/item.html?id=' + value + '" target="_blank">Lucy</a>)';
    },

    renderBagType: function (value) {
        if (typeof StaticData.bagtypes[value] != "undefined") {
            return StaticData.bagtypes[value];
        } else {
            return StaticData.worldcontainers[value];
        }
    },

    renderBagSize: function (value) {
        switch (value) {
            case "0":
                return "Non-Bag";
            case "1":
                return "Small";
            case "2":
                return "Medium";
            case "3":
                return "Large";
            case "4":
                return "Giant";
            case "5":
                return "Giant - Assembly Kit";
        }
    },

    renderItemType: function (value, metaData, record) {
        value = parseInt(value);
        if (parseInt(value) == 0) {
            if (parseInt(record.data.damage) < 1) {
                return "Misc";
            } else {
                return StaticData.itemtypes[value];
            }
        } else {
            return StaticData.itemtypes[value];
        }
    },

    renderAugRestrict: function (value) {
        return StaticData.itemaugrestrict[value];
    },

    renderMaterial: function (value) {
        return StaticData.itemmaterial[value];
    },

    onSearchItems: function (e) {
        var search = Ext.ComponentQuery.query("#itemsGrid-search")[0].inputEl.getValue();
        Ext.data.StoreManager.lookup('itemsStore').getProxy().setExtraParam('query', search);
        Ext.getCmp("itemsGrid-ID").lookupReference('pagingtoolbartop').moveFirst();
        Ext.data.StoreManager.lookup('itemsStore').load({params: {page: 1}});
    },

    onApplyFilterClick: function (e) {
        Util.grid.filter.applyFilterClick(Ext.data.StoreManager.lookup("itemsStore"), peq.app.getController('peq.view.items.ItemsGridController'), "itemsGrid-ID");
    },

    onRemoveFilterClick: function (e) {
        Util.grid.filter.removeFilterClick(e, Ext.data.StoreManager.lookup("itemsStore"), peq.app.getController('peq.view.items.ItemsGridController'), "itemsGrid-ID");
    },

    onAddFilter: function (e) {
        Util.grid.filter.showAddFilterDock(Ext.data.StoreManager.lookup("itemsStore"), peq.app.getController('peq.view.items.ItemsGridController'), "itemsGrid-ID");
    },
    
    showFilterBar: function() {
        Util.grid.filter.showFilterBar(peq.app.getController('peq.view.items.ItemsGridController'), "itemsGrid-ID");
    },

    // This is executed anytime the value of the filter field combo changes (on add filter form)
    // Used primarily to then change the store of the value filter to accomodate special case selections (itemtype, etc)
    // In short, it allows you to make changing the field combo directly change the options available in the value combo
    // This method will be heavily different between the different modules
    onFilterFieldChange: function(e, newValue, oldValue, opts) {
        var defaultOverrides, data = [], gridId = "itemsGrid-ID";
        defaultOverrides = AppConfig.gridSettings[gridId].columns;
        
        Ext.getCmp('addFilterValue_' + gridId).forceSelection = false;
        if (typeof defaultOverrides[newValue] != "undefined") {
            if (typeof defaultOverrides[newValue].renderer != "undefined") {
                switch(defaultOverrides[newValue].renderer) {
                    case 'renderBoolean':
                        data = [
                            {label: 'Yes', field: '1'}, 
                            {label: 'No', field: '0'}
                        ];
                        Ext.getCmp('addFilterValue_' + gridId).forceSelection = true;
                        break;
                    case 'renderItemType':
                        Ext.Object.each(StaticData.itemtypes, function(key, value) {
                            if (key == 0) {
                                data.push({label: 'Misc / 1HS', field: key});
                            } else {
                                data.push({label: value, field: key});
                            }
                        });
                        break;
                    case 'renderAugRestrict':
                        Ext.Object.each(StaticData.itemaugrestrict, function(key, value) {
                            data.push({label: value, field: key});
                        });
                        break;
                    case 'renderMaterial':
                        Ext.Object.each(StaticData.itemmaterial, function(key, value) {
                            data.push({label: value, field: key});
                        });
                        break;
                }
            }
        }
        if (data.length < 1) {
            Ext.getCmp('addFilterValue_' + gridId).triggerEl.hide();
        } else {
            Ext.getCmp('addFilterValue_' + gridId).triggerEl.show();
        }
        Ext.getCmp('addFilterValue_' + gridId).setStore(Ext.create('Ext.data.Store', {
            fields: [
                {type: 'string', name: 'label'}, 
                {type: 'string', name: 'field'}
            ],
            data: data
        }));
    }
});
