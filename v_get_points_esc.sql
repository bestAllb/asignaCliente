create view v_get_points_esc as
select vnc.id id,
       usr.name nombre,
       usr.gender sexo,
       acc.amount totalDeuda,
       acc.will_pay totalPagar,
       date(vnc.firstPaymentDate) primerPago,
       date(acc.will_pay_on) finPago,
       con.program_duration mesesCon,
       timestampdiff(month,
           vnc.firstPaymentDate,
           acc.will_pay_on
           ) mesesSis,
       acc.will_pay / (vnc.paymentSum - vnc.dbmFee) mesesEdwin,
       vnc.firstPaymentID idPago,
       vnc.firstPaymentComplete fecha,
       vnc.consultant_id ESC
from view_new_clients vnc
inner join accounts acc on vnc.id = acc.user
inner join contracts con on vnc.id = con.user
inner join users usr on vnc.id = usr.id
where MONTH(vnc.firstPaymentDate) = MONTH('2020-07-31')
and YEAR(vnc.firstPaymentDate) = YEAR(CURRENT_DATE())
and vnc.firstPaymentComplete = 1