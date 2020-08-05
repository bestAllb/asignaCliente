select
    b.ESC esc,
    sum(b.deudas) deudas,
    count(b.idUser) clientes,
    sum(b.hombre) hombre,
    sum(b.mujer) mujer,
    sum(b.meses) meses,
    sum(b.monto) monto
from
    (select
           vnc.id idUser,
           vnc.consultant_id ESC,
           count(vnc.id) deudas,
           avg(con.program_duration) meses,
           usr.gender = 'M' as hombre,
           usr.gender = 'F' as mujer,
           sum(acc.amount) monto
    from view_new_clients vnc
    inner join accounts acc on vnc.id = acc.user
    inner join contracts con on vnc.id = con.user
    inner join users usr on vnc.id = usr.id
    where MONTH(vnc.firstPaymentDate) = MONTH(current_date())
    and YEAR(vnc.firstPaymentDate) = YEAR(current_date())
    #and vnc.firstPaymentComplete = 1
    group by vnc.id) as b
group by esc;