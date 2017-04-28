Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    layout: 'fit',

    getSettingsFields: function () {
        return [{
            xtype: 'rallytimeframe',
            name: 'INTERVAL',
            fieldLabel: 'DateRange',
            timeFrameHideLabel: true,
            timeFrameQuantityWidth: 50,
            minValue: 1,
            maxValue: 180,
            storeConfig: ['Weeks', 'Months', 'Quarters'],
            initialValue: '12,Months',
            getValue: function () {
                return `${this.quantityComponent.getValue()},${this.unitsComponent.getValue()}`;
            },
            setValue: function (value) {
                const { setValue } = this.self.prototype;
                const [timeFrameQuantity, timeFrameUnit] = value.split(',');
                return setValue.call(this, { timeFrameQuantity: +timeFrameQuantity, timeFrameUnit });
            }
        }];
        //         },
        //   [reportParams.SEVERITIES]: getMultivalueFieldValueComboBox({
        //     name: reportParams.SEVERITIES,
        //     fieldLabel: formatMessageAsString({ messageKey: 'Apps/Settings/severities' }),
        //     model: 'defect',
        //     field: 'Severity',
        //     emptyText: formatMessageAsString({ messageKey: 'Apps/Settings/severities-empty-text' })
        //   }),
        //   [reportParams.PRIORITIES]: getMultivalueFieldValueComboBox({
        //     name: reportParams.PRIORITIES,
        //     fieldLabel: formatMessageAsString({ messageKey: 'Apps/Settings/priorities' }),
        //     model: 'defect',
        //     field: 'Priority',
        //     emptyText: formatMessageAsString({ messageKey: 'Apps/Settings/priorities' })
        //   }),
        //   [reportParams.STATES]: getMultivalueFieldValueComboBox({
        //     name: reportParams.STATES,
        //     fieldLabel: formatMessageAsString({ messageKey: 'Apps/Settings/states' }),
        //     model: 'defect',
        //     field: 'State',
        //     emptyText: formatMessageAsString({ messageKey: 'Apps/Settings/states-empty-text' })
        //   }),
        //   [reportParams.BUILD_DEFINITION]: {
        //     xtype:  'rallysearchcombobox',
        //     name: reportParams.BUILD_DEFINITION,
        //     fieldLabel: formatMessageAsString({ messageKey: 'Apps/Settings/build-definition' }),
        //     allowNoEntry: true,
        //     noEntryText: formatMessageAsString({ messageKey: 'Apps/Settings/build-definition-empty-text' }),
        //     triggerCls: 'icon-search',
        //     storeConfig: {
        //       model: 'builddefinition'
        //     },
        //     shouldRespondToScopeChange: true,
        //     readyEvent: 'ready',
        //     handlesEvents: {
        //       projectscopechanged: function (context) {
        //         this.refreshWithNewContext(context);
        //       }
        //     },
        //     fromExt2Value: (initialValue) => isUri(initialValue) ? initialValue : (initialValue && initialValue !== '-1') ? `/builddefinition/${initialValue}` : null,
        //     toExt2Value: (currentValue) => getOid(currentValue) || -1
        //   },
        //   [reportParams.WORK_ITEMS]: Object.assign(getCommonComboBoxConfig(), {
        //     xtype: 'rallycombobox',
        //     displayField: 'name',
        //     valueField: 'value',
        //     store: {
        //       fields: ['name', 'value'],
        //       data: [
        //         { name: formatMessageAsString({ messageKey: 'TypeDef/HierarchicalRequirement', count: 2 }), value: 'Stories' },
        //         { name: formatMessageAsString({ messageKey: 'AttrDef/Shared/Defects'}), value: 'Defects' },
        //         { name: formatMessageAsString({ messageKey: 'Apps/Settings/combined'}), value: 'Combined' }
        //       ]
        //     },
        //     name: reportParams.WORK_ITEMS,
        //     multiSelect: true,
        //     fieldLabel: formatMessageAsString({ messageKey: 'Apps/Settings/series' }),
        //     allowBlank: false,
        //     plugins: ['rallyfieldvalidationui'],
        //     emptyText: formatMessageAsString({ messageKey: 'Apps/Settings/series-empty-text' }),
        //     initialValue: ['Stories', 'Defects', 'Combined']
        //   }),
        //   [reportParams.FROM_STATE]: Object.assign(getCommonComboBoxConfig(), {
        //     xtype: 'rallyfieldvaluecombobox',
        //     model: 'hierarchicalrequirement',
        //     field: 'ScheduleState',
        //     initialValue: 'In-Progress',
        //     name: reportParams.FROM_STATE,
        //     fieldLabel: 'Start',
        //     editable: false,
        //     listeners: {
        //       ready: (combo) => {
        //         const lastRecord = combo.store.getAt(combo.store.getTotalCount() - 1);
        //         if (lastRecord && lastRecord.get(combo.displayField) !== 'Accepted') {
        //           combo.store.remove(lastRecord);
        //         }
        //       }
        //     }
        //   }),
        //   [reportParams.TO_STATE]: Object.assign(getCommonComboBoxConfig(), {
        //     xtype: 'rallyfieldvaluecombobox',
        //     model: 'hierarchicalrequirement',
        //     field: 'ScheduleState',
        //     name: reportParams.TO_STATE,
        //     initialValue: 'Accepted',
        //     fieldLabel: 'End',
        //     editable: false,
        //     listeners: {
        //       ready: (combo) => {
        //         _.each(combo.store.getRange(), (record) => {
        //           if (record.get(combo.displayField) === 'Accepted') {
        //             return false;
        //           }
        //           combo.store.remove(record);
        //         });
        //       }
        //     }
        //   }),
        //   [reportParams.TAGS]: {
        //     xtype: 'rallytagpicker',
        //     name: reportParams.TAGS,
        //     emptyText: formatMessageAsString({ messageKey: 'Apps/Settings/tags-empty-text' }),
        //     hideTrigger: true,
        //     fieldLabel: formatMessageAsString({ messageKey: 'Apps/Settings/tags' }),
        //     pickerAlign: 'tl-bl',
        //     pickerCfg: {
        //       style: {
        //         border: '1px solid #DDD', // eslint-disable-line rally/no-non-externalized-strings
        //         'border-top': 'none'
        //       },
        //       height: 190,
        //       shadow: false
        //     },
        //     listeners: {
        //       afteralignpicker: function() {
        //         this.doAlign();
        //         const picker = this.getPicker();
        //         const dom = picker && picker.el.dom;
        //         if (dom) {
        //           dom.style.zIndex = '199';
        //         }
        //       },
        //       boxready: (picker) => {
        //         picker.expand();
        //         picker.setAlwaysExpanded(true);
        //       }
        //     },
        //     maintainScrollPosition: true,
        //     margin: '10px 0 207px 0',
        //     transformOriginalValue: function(value) {
        //       if (_.isString(value)) {
        //         return value.split(',').map((tag) => isUri(tag) ? tag : `/tag/${tag}`);
        //       }
        //       return value;
        //     },
        //     toExt2Value: (currentValue) => {
        //       if (_.isString(currentValue)) { return currentValue; }
        //       return currentValue.map(getOid).join(',');
        //     }
        //   }
    },

    afterRender: function () {
        this.callParent(arguments);
        this.add({
            xtype: 'rallystandardreport',
            project: Rally.util.Ref.getRelativeUri(this.getContext().getProject()),
            projectScopeUp: this.getContext().getProjectScopeUp(),
            projectScopeDown: this.getContext().getProjectScopeDown(),
            height: this.getHeight(),
            width: this.getWidth(),
            reportConfig: {
                report: Rally.ui.report.StandardReport.Reports.CycleLeadTime,
                work_items: 'Stories,Defects,Combined',
                from_state: 'In-Progress',
                to_state: 'Accepted',
                tags: [],
                interval: 'Months',
                intervals_back: 12,
                legend: 'show',
                subchart: 'show',
                x_axis_label: 'show',
                y_axis_label: 'show'
            }
        });
    }
});
