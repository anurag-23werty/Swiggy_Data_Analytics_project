--creating Schema
CREATE TABLE dim_date (
    date_id INT GENERATED ALWAYS AS IDENTITY PRIMARY key,
    full_date date,
    year int,
    month int,
    month_name varchar(20),
    quarter int,
    day int,
    week int
);
select * from dim_date
create table dim_location(
location_id int generated always as identity primary key,
state varchar(100),
city varchar(100),
location varchar(200)
);
create table dim_restaurant(
 restaurant_id int generated always as identity primary key,
 restaurant_name varchar(200));
create table dim_dish(
dish_id int generated always as identity primary key,
dish_name varchar(200));
create table dim_category(
category_id int generated always as identity primary key,
dish_name varchar(200)
)
alter table dim_category rename column dish_name to category
insert into fact_swiggy_orders (
 date_id,
 price_inr,
 rating,
 rating_count,
 location_id,
 restaurant_id,
 category_id,
 dish_id)
 select
 dd.date_id,
 s.price_inr,
 s.rating,
 s.rating_count,
 dl.location_id,
 dr.restaurant_id,
 dc.category_id,
 dsh.dish_id
 from swiggy_data s
 join dim_date dd
 on to_date(s.order_date,'DD-MM-YYYY') = dd.full_date 
 join dim_location dl
 on dl.state = s.state 
 and dl.city = s.city 
 and dl.location = s.location
 join dim_restaurant dr 
 on dr.restaurant_name = s.restaurant_name 
 join dim_category dc 
 on dc.category = s.category 
 join dim_dish dsh 
 on dsh.dish_name = s.dish_name 
 select * from fact_swiggy_orders f
 join dim_date d on f.date_id = d.date_id
 join dim_location l on f.location_id = l.location_id
 join dim_restaurant r on r.restaurant_id = f.restaurant_id
 join dim_category c on c.category_id = f.category_id
 join dim_dish di on di.dish_id = f.dish_id
