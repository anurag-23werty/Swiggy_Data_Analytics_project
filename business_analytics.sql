select * from fact_swiggy_orders 
select count(*) as total_orders
from fact_swiggy_orders 
select sum(price_inr) as total_revenue from fact_swiggy_orders 
select
TO_CHAR(SUM(price_inr::NUMERIC) / 1000000.0, 'FM9999999990.00') || ' INR MILLION'
as total_revenue
from fact_swiggy_orders 
select
TO_CHAR(AVG(price_inr::NUMERIC) , 'FM9999999990.00') || ' INR MILLION'
as total_revenue
from fact_swiggy_orders 
select
TO_CHAR(AVG(rating::NUMERIC) , 'FM9999999990.00')
as avg_rating
from fact_swiggy_orders --4.30
select * from fact_swiggy_orders 
select * from dim_date
select 
d.year,
d.month,
d.month_name,

count(*) as total_orders
from fact_swiggy_orders f
join dim_date d on d.date_id = f.date_id
group by d.year,
d.month,
d.month_name
order by count(*)  desc

select 
d.year,
d.month,
d.month_name,
sum(price_inr) as total_revenue
from fact_swiggy_orders fso 
join dim_date d on fso.date_id = d.date_id 
group by d.year,
d.month,
d.month_name 
order by total_revenue  desc

select 
d.year,
d.quarter,
count(*) as total_orders
from fact_swiggy_orders f
join dim_date d on f.date_id = d.date_id 
group by d.year,
d.quarter
order by count(*) desc

select 
d.year,
count(*) as total_orders
from fact_swiggy_orders fso 
join dim_date d on fso.date_id = d.date_id
group by d.year
order by count(*) desc
--total orders by price range
select 
case
	when (price_inr::NUMERIC) <100 then 'UNDER 100'
	when (price_inr::NUMERIC) between 100 and 199 then '100-199'
	when (price_inr::NUMERIC) between 200 and 299 then '200-299'
	when (price_inr::NUMERIC) between 300 and 499 then '300-499'
	else '500+'
end as price_range,
count(*) as total_orders
from fact_swiggy_orders 
group by
case
	when (price_inr::NUMERIC) <100 then 'UNDER 100'
	when (price_inr::NUMERIC) between 100 and 199 then '100-199'
	when (price_inr::NUMERIC) between 200 and 299 then '200-299'
	when (price_inr::NUMERIC) between 300 and 499 then '300-499'
	else '500+'
end
order by total_orders desc
SELECT
    TRIM(TO_CHAR(d.full_date, 'Day')) AS day_name,
    COUNT(*) AS total_orders
FROM fact_swiggy_orders f
JOIN dim_date d
ON f.date_id = d.date_id
GROUP BY
    EXTRACT(DOW FROM d.full_date),
    TRIM(TO_CHAR(d.full_date, 'Day'))
ORDER BY
    EXTRACT(DOW FROM d.full_date);
--top 10 cities by order volume
select  l.city,
count(*) as total_orders from fact_swiggy_orders f
join dim_location l
on l.location_id = f.location_id 
group by l.city 
order by count(*) desc
limit 10
select  l.state,
sum(f.price_inr) as total_revenue from fact_swiggy_orders f
join dim_location l
on l.location_id = f.location_id 
group by l.state 
order by sum(f.price_inr) desc

--top 10 restaurants by order 
select  r.restaurant_name,
sum(f.price_inr) as total_revenue from fact_swiggy_orders f
join dim_restaurant r
on r.restaurant_id  = f.location_id 
group by r.restaurant_name 
order by sum(f.price_inr) desc
limit 10
--top 10 categories by volume
select
c.category,
count(*) as total_orders
from fact_swiggy_orders f
join dim_category c
on c.category_id = f.category_id
group by c.category
order by total_orders desc
limit 10
--most ordered dishes
select 
d.dish_name,
count(*) as order_count
from fact_swiggy_orders f
join dim_dish d on f.dish_id = d.dish_id
group by d.dish_name
order by order_count desc
--cuisine performance (Orders+avg rating)
select
c.category,
count(*) as total_orders,
avg(f.rating) as avg_rating
from fact_swiggy_orders f
join dim_category c on f.category_id = c.category_id
group by c.category
order by avg_rating desc
