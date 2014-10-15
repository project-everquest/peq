Ext.define('peq.view.merchants.Merchants', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.merchants-panel',

    controller: 'merchants',

    layout: 'anchor',

    listeners: {
        afterrender: 'onAfterRender'
    },

    items: [{
        xtype: 'panel',
        width: 150,
        listeners: {
            afterrender: 'onAfterRender'
        },
        bodyStyle: {
            backgroundColor: '#240B3B'
        },
        items: [{
            xtype: 'segmentedbutton',
            vertical: true,
            style: {
                width: '100%'
            },
            items: [{
                text: 'Browse Merchants',
                style: {
                    height: '30px'
                },
                pressed: true
            }]
        }]
    }, {
        xtype: 'panel',
        itemId: 'Merchants-PanelContainer',
        width: '100%',
        region: 'center',
        items: []
    }]
});