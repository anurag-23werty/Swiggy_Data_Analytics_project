INSERT INTO dim_date (
    full_date,
    year,
    month,
    month_name,
    quarter,
    day,
    week
)
SELECT DISTINCT
    TO_DATE(order_date, 'DD-MM-YYYY'),
    EXTRACT(YEAR FROM TO_DATE(order_date, 'DD-MM-YYYY'))::INT,
    EXTRACT(MONTH FROM TO_DATE(order_date, 'DD-MM-YYYY'))::INT,
    TRIM(TO_CHAR(TO_DATE(order_date, 'DD-MM-YYYY'), 'Month')),
    EXTRACT(QUARTER FROM TO_DATE(order_date, 'DD-MM-YYYY'))::INT,
    EXTRACT(DAY FROM TO_DATE(order_date, 'DD-MM-YYYY'))::INT,
    EXTRACT(WEEK FROM TO_DATE(order_date, 'DD-MM-YYYY'))::INT
FROM swiggy_data
WHERE order_date IS NOT NULL;
select * from dim_date
insert into dim_location(state,city,location)
select distinct
state,
city,
location
from swiggy_data;
insert into dim_restaurant(restaurant_name)
select distinct
restaurant_name
from swiggy_data
insert into dim_category(category)
select distinct
dish_name
from swiggy_dat
