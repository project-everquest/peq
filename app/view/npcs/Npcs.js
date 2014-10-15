Ext.define('peq.view.npcs.Npcs', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.npcs-panel',

    controller: 'npcs',

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
                text: 'Browse Npcs',
                style: {
                    height: '30px'
                },
                pressed: true
            }, {
                text: 'Browse Horses',
                style: {
                    height: '30px'
                }
            }]
        }]
    }, {
        xtype: 'panel',
        itemId: 'Npcs-PanelContainer',
        width: '100%',
        region: 'center',
        items: []
    }]
});