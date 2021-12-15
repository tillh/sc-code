# sc-code

## React

### Task 1

Environment:
* node v14.18.1
* yarn 1.22.17

Path `react/phone-book`

Start application `yarn start` or create a production build and serve build directory

Execute tests `yarn test:nowatch`

### Task 2
```typescript
...
const [position, setPosition] = useState<MousePositionType>({ x: 0, y: 0 });
const [windowSize, setWindowSize] = useState<WindowSizeType>({
  height: 0,
  width: 0,
});
let [distance, setDistance] = useState(0);
const { distanceCalculator } = mathLib();
```
This creates a new distanceCalculator function on every single render. This is a static function and can be moved out of the component function.


```typescript
...
const handleMouseMove = (e: { clientX: number; clientY: number }) => setPosition({ x: e.clientX, y: e.clientY });
const handleResize = () => setWindowSize({ height: window.innerHeight, width: window.innerWidth });
```
New functions are defined on every render. With useCallback and an empty dependency array this can be avoided.

```typescript
useEffect(() => {
  setDistance(
    distanceCalculator(position, {
      x: windowSize.width / 2,
      y: windowSize.height / 2,
    })
  );
  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("resize", handleResize);
}, [position, windowSize.width, windowSize.height]);
```
The effect must return a callback function where the listeners are deregistered. Otherwise new listeners will be registered each time useEffect is called. This leads to performance and memory problems.

Example
```typescript
useEffect(() => {
    ...
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
    };

}, [position, windowSize.width, windowSize.height]);
```

## SQL

Environment
* Postgres Docker Container (https://hub.docker.com/_/postgres):14.1
* `docker run --name sc-code -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres:14.1`

### Task 1

1: Create client and user tables

```sql
create table clients
(
    id      uuid not null default gen_random_uuid()
            constraint clients_pk
            primary key,
    name    varchar(255) not null,
    active  boolean default true
);
```
```sql
create table users
(
    id          uuid not null default gen_random_uuid()
                constraint users_pk
                primary key,
    name        varchar(255) not null,
    password    varchar(255) not null,
    client_id   uuid not null
                constraint client_id_fk
                references clients
                on delete cascade,
    active      boolean default true
);
```

2: Add clients and users
```sql
do $$
    begin
        insert into clients(name, active)
        values ('Client 1', true),
               ('Client 2', true),
               ('Client 3', true),
               ('Client 4', true),
               ('Client 5', false);

        insert into users(name, password, active, client_id)
        values  ('User 1', 'any-password', true, (SELECT id from clients WHERE name = 'Client 1')),
                ('User 2', 'any-password', true, (SELECT id from clients WHERE name = 'Client 1')),
                ('User 3', 'any-password', true, (SELECT id from clients WHERE name = 'Client 1')),
                ('User 4', 'any-password', true, (SELECT id from clients WHERE name = 'Client 1')),
                ('User 5', 'any-password', true, (SELECT id from clients WHERE name = 'Client 2')),
                ('User 6', 'any-password', true, (SELECT id from clients WHERE name = 'Client 2')),
                ('User 7', 'any-password', false, (SELECT id from clients WHERE name = 'Client 3')),
                ('User 8', 'any-password', false, (SELECT id from clients WHERE name = 'Client 3')),
                ('User 9', 'any-password', false, (SELECT id from clients WHERE name = 'Client 3'));
     end
$$;
```

3: List clients and number of users
```sql
select clients.name, count(users.client_id) as "number of users"
    from clients
        left join users on clients.id = users.client_id
group by clients.name;
```

4: List all active clients with more than 2 active users
```sql
select clients.name, count(users.client_id) as "number of users"
    from clients
        left join users on clients.id = users.client_id and users.active is true
where clients.active is true
group by clients.name
having COUNT(*) > 2;
```

### Task 2

1: Create permissions table
```sql
create table permissions
(
    id   uuid default gen_random_uuid() not null
         constraint permissions_pk
         primary key,
    name varchar(255) not null
);
```
```sql
create table clients_permission
(
    client_id   uuid not null
                constraint fk_client
                references clients
                on delete cascade,
    permission_id uuid not null
                  constraint fk_permission
                  references permissions
                  on delete cascade,
    primary key (client_id, permission_id)
);
```
```sql
create table users_permission
(
    user_id       uuid not null
                  constraint fk_user
                  references users
                  on delete cascade,
    permission_id uuid not null
                  constraint fk_permission
                  references permissions
                  on delete cascade,
    primary key (user_id, permission_id)
);
```

2: Add permissions
```sql
do $$
    begin
        -- add some permissions
        insert into permissions(name)
        values ('campaign'),
               ('line_item'),
               ('creative');

        -- add campaign  permission to user 1 and client 1
        insert into clients_permission(client_id, permission_id)
            values ((select id from clients where name = 'Client 1'), (SELECT id FROM permissions where name = 'campaign'));

        insert into users_permission(user_id, permission_id)
            values ((select id from users where name = 'User 1'), (SELECT id FROM permissions where name = 'campaign'));

        -- add line_item permission to user 1
        insert into users_permission(user_id, permission_id)
            values ((select id from users where name = 'User 1'), (SELECT id FROM permissions where name = 'line_item'));

        -- add creative permission to client 1
        insert into clients_permission(client_id, permission_id)
        values ((select id from clients where name = 'Client 1'), (SELECT id FROM permissions where name = 'creative'));
    end;
$$;
```

3: Return all permissions for User 1
```sql
select u.name, string_agg(distinct p.name, ', ') as permissions
    from users as u
        join users_permission as up on u.id = up.user_id
        join clients_permission cp on u.client_id = cp.client_id
        join permissions as p on up.permission_id = p.id or cp.permission_id = p.id
where u.name = 'User 1'
group by u.name;
```
