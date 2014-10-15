Ext.define('peq.view.items.ItemsGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.items-grid',

    controller: 'itemsgrid',
    viewModel: {
        type: 'itemsgrid'
    },

    id: 'itemsGrid-ID',

    viewConfig: {
        autoFit: true
    },
    listeners: {
        afterrender: 'onAfterRender'
    },
    bind: {
        store: '{items}'
    },
    selModel: 'row',
    columns: {
        defaults: {
            hidden: true
        },
        items: []
    },
    dockedItems: [{
        xtype: 'pagingtoolbar',
        dock: 'top',
        reference: 'pagingtoolbartop',
        bind: {
            store: '{items}'
        },
        listeners: {
            change: 'onPagingToolbarChange',
            render: function (e) {
                var items = e.items;
                items.insert(0, Ext.create('Ext.toolbar.Fill'));
                items.add(Ext.create('Ext.toolbar.Fill'));
                items.add(Ext.create('Ext.form.field.Text', {
                    width: 250,
                    fieldLabel: 'Search',
                    labelWidth: 50,
                    itemId: 'userBrowseGrid-search',
                    enableKeyEvents: true,
                    listeners: {
                        render: function(e) {
                            e.inputEl.set({title: "Searches the Login and Name fields"})
                        },
                        specialKey: function(field, e) {
                            if (e.getKey() === e.ENTER) {
                                //app.getController('extDM.view.user.UserBrowseGridController').onSearchUsers();
                            }
                        }
                    }
                }));
                items.add(Ext.create('Ext.button.Button', {
                    glyph: 0xf002,
                    baseCls: '',
                    listeners: {
                        render: function(e) {
                            Ext.get(e.id + '-btnIconEl').setStyle({
                                color: "#000000",
                                cursor: "pointer"
                            });
                        },
                        click: function(e) {
                            //app.getController('extDM.view.user.UserBrowseGridController').onSearchUsers();
                        }
                    }
                }));
                items.add(Ext.create('Ext.toolbar.Fill'));
            }
        }
    }]
});