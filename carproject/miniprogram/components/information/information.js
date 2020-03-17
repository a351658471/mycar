"use strict";
Component({
    properties: {
        time: {
            type: String | Number,
            value: "刚刚"
        },
        num: {
            type: Number,
            value: 0
        },
        num1: {
            type: Number,
            value: 0
        },
        num2: {
            type: Number,
            value: 0
        }
    },
    data: {},
    methods: {
        dian: function (event) {
            var message = this.data.num2;
            if (message == 0) {
                message += 1;
            }
            else {
                message -= 1;
            }
            this.setData({
                num2: message
            });
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mb3JtYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmZvcm1hdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsU0FBUyxDQUFDO0lBQ1IsVUFBVSxFQUFFO1FBQ1YsSUFBSSxFQUFFO1lBQ0osSUFBSSxFQUFFLE1BQU0sR0FBRyxNQUFNO1lBQ3JCLEtBQUssRUFBRSxJQUFJO1NBQ1o7UUFDRCxHQUFHLEVBQUU7WUFDSCxJQUFJLEVBQUMsTUFBTTtZQUNYLEtBQUssRUFBQyxDQUFDO1NBQ1I7UUFDRCxJQUFJLEVBQUU7WUFDSixJQUFJLEVBQUUsTUFBTTtZQUNaLEtBQUssRUFBRSxDQUFDO1NBQ1Q7UUFDRCxJQUFJLEVBQUU7WUFDSixJQUFJLEVBQUUsTUFBTTtZQUNaLEtBQUssRUFBRSxDQUFDO1NBQ1Q7S0FDRjtJQUNELElBQUksRUFBRSxFQUVMO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsSUFBSSxZQUFDLEtBQVU7WUFDYixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQTtZQUM1QixJQUFJLE9BQU8sSUFBSSxDQUFDLEVBQUU7Z0JBQ2hCLE9BQU8sSUFBSSxDQUFDLENBQUE7YUFDYjtpQkFBTTtnQkFDTCxPQUFPLElBQUksQ0FBQyxDQUFBO2FBQ2I7WUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNYLElBQUksRUFBRSxPQUFPO2FBQ2QsQ0FBQyxDQUFBO1FBQ0osQ0FBQztLQUNGO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiQ29tcG9uZW50KHtcclxuICBwcm9wZXJ0aWVzOiB7XHJcbiAgICB0aW1lOiB7XHJcbiAgICAgIHR5cGU6IFN0cmluZyB8IE51bWJlcixcclxuICAgICAgdmFsdWU6IFwi5Yia5YiaXCJcclxuICAgIH0sXHJcbiAgICBudW06IHtcclxuICAgICAgdHlwZTpOdW1iZXIsXHJcbiAgICAgIHZhbHVlOjBcclxuICAgIH0sXHJcbiAgICBudW0xOiB7XHJcbiAgICAgIHR5cGU6IE51bWJlcixcclxuICAgICAgdmFsdWU6IDBcclxuICAgIH0sXHJcbiAgICBudW0yOiB7XHJcbiAgICAgIHR5cGU6IE51bWJlcixcclxuICAgICAgdmFsdWU6IDBcclxuICAgIH1cclxuICB9LFxyXG4gIGRhdGE6IHtcclxuXHJcbiAgfSxcclxuICBtZXRob2RzOiB7XHJcbiAgICBkaWFuKGV2ZW50OiBhbnkpIHtcclxuICAgICAgdmFyIG1lc3NhZ2UgPSB0aGlzLmRhdGEubnVtMlxyXG4gICAgICBpZiAobWVzc2FnZSA9PSAwKSB7XHJcbiAgICAgICAgbWVzc2FnZSArPSAxXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbWVzc2FnZSAtPSAxXHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICBudW0yOiBtZXNzYWdlXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG59KSJdfQ==