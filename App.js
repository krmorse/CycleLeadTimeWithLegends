Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    layout: 'fit',

    config: {
        defaultSettings: {
            work_items: 'Stories,Defects,Combined',
            from_state: 'In-Progress',
            to_state: 'Accepted',
            tags: '',
            timeFrameUnit: 'Months',
            timeFrameQuantity: 12,
            show_legend: true
        }
    },

    getSettingsFields: function () {
        var commonComboConfig = {
            initComponent: function () {
                this.self.prototype.initComponent.call(this);
                this.store.on('load', function () {
                    this.setDefaultValue();
                    this.onReady();
                }, this);
            },
            transformOriginalValue: function (value) {
                if (_.isString(value)) {
                    value = value.split(',');
                }
                return value;
            }
        };

        return [{
            xtype: 'rallytimeframe',
            name: 'interval',
            fieldLabel: 'Date Range',
            timeFrameHideLabel: true,
            timeFrameQuantityWidth: 50,
            minValue: 1,
            maxValue: 180,
            storeConfig: ['Weeks', 'Months', 'Quarters'],
            initialValue: '12,Months',
            getValue: function () {
                return this.quantityComponent.getValue() + ',' + this.unitsComponent.getValue();
            },
            setValue: function (value) {
                var values = value.split(','),
                    timeFrameQuantity = values[0],
                    timeFrameUnit = values[1];
                return this.self.prototype.setValue.call(this, { timeFrameQuantity: +timeFrameQuantity, timeFrameUnit: timeFrameUnit });
            }
        },
        Ext.apply({
            xtype: 'rallycombobox',
            displayField: 'name',
            valueField: 'value',
            store: {
                fields: ['name', 'value'],
                data: [
                    { name: 'Stories', value: 'Stories' },
                    { name: 'Defects', value: 'Defects' },
                    { name: 'Combined', value: 'Combined' }
                ]
            },
            name: 'work_items',
            multiSelect: true,
            fieldLabel: 'Series',
            allowBlank: false,
            plugins: ['rallyfieldvalidationui'],
            emptyText: 'Select Series...',
            initialValue: ['Stories', 'Defects', 'Combined']
        }, commonComboConfig),
        Ext.apply({
            xtype: 'rallyfieldvaluecombobox',
            model: 'hierarchicalrequirement',
            field: 'ScheduleState',
            initialValue: 'In-Progress',
            name: 'from_state',
            fieldLabel: 'Start',
            editable: false,
            listeners: {
                ready: function (combo) {
                    var lastRecord = combo.store.getAt(combo.store.getTotalCount() - 1);
                    if (lastRecord && lastRecord.get(combo.displayField) !== 'Accepted') {
                        combo.store.remove(lastRecord);
                    }
                }
            }
        }, commonComboConfig),
        Ext.apply({
            xtype: 'rallyfieldvaluecombobox',
            model: 'hierarchicalrequirement',
            field: 'ScheduleState',
            name: 'to_state',
            initialValue: 'Accepted',
            fieldLabel: 'End',
            editable: false,
            listeners: {
                ready: function (combo) {
                    _.each(combo.store.getRange(), function (record) {
                        if (record.get(combo.displayField) === 'Accepted') {
                            return false;
                        }
                        combo.store.remove(record);
                    });
                }
            }
        }, commonComboConfig),
        {
            xtype: 'rallytagpicker',
            name: 'tags',
            emptyText: 'Select Tags...',
            hideTrigger: true,
            fieldLabel: 'Tags',
            pickerAlign: 'tl-bl',
            pickerCfg: {
                style: {
                    border: '1px solid #DDD',
                    'border-top': 'none'
                },
                height: 190,
                shadow: false
            },
            listeners: {
                afteralignpicker: function () {
                    this.doAlign();
                    var picker = this.getPicker();
                    var dom = picker && picker.el.dom;
                    if (dom) {
                        dom.style.zIndex = '199';
                    }
                },
                boxready: function (picker) {
                    picker.expand();
                    picker.setAlwaysExpanded(true);
                }
            },
            maintainScrollPosition: true,
            margin: '10px 0 207px 0',
            transformOriginalValue: function (value) {
                if (_.isString(value)) {
                    return value.split(',').map(function (tag) {
                        return Rally.util.Ref.isRefUri(tag) ? tag : '/tag/' + tag;
                    });
                }
                return value;
            }
        }];
    },

    launch: function () {
        var showChrome = this.getSetting('show_legend') ? 'show' : 'hide';
        this.add({
            xtype: 'rallystandardreport',
            project: Rally.util.Ref.getRelativeUri(this.getContext().getProject()),
            projectScopeUp: this.getContext().getProjectScopeUp(),
            projectScopeDown: this.getContext().getProjectScopeDown(),
            height: this.getHeight(),
            width: this.getWidth(),
            reportConfig: {
                report: Rally.ui.report.StandardReport.Reports.CycleLeadTime,
                work_items: this.getSetting('work_items'),
                from_state: this.getSetting('from_state'),
                to_state: this.getSetting('to_state'),
                tags: this.getSetting('tags').split(',').map(function (tag) {
                    return Rally.util.Ref.getOidFromRef(tag);
                }),
                interval: this.getSetting('timeFrameUnit'),
                intervals_back: this.getSetting('timeFrameQuantity'),
                legend: showChrome,
                subchart: showChrome,
                x_axis_label: showChrome,
                y_axis_label: showChrome
            }
        });
    }
});
