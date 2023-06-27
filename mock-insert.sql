do
$$
    begin
        for r in 0..1000
            loop
                insert into "app_public".activities(canonical_id,
                                                    account_id,
                                                    amount,
                                                    currency,
                                                    type,
                                                    occurred_at,
                                                    p2p_handle)
                values (gen_random_uuid(),
                        'account-122',
                        random() * 100,
                        'CAD',
                        'p2p_payment',
                        (select NOW() + (random() * (NOW() + '10 days' - NOW()))),
                        'no_mo');
            end loop;
    end;
$$;
