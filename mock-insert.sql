do
$$
    begin
        for r in 0..10
            loop
                insert into "app_public".activities(canonical_id,
                                                    account_id,
                                                    amount,
                                                    type,
                                                    currency,
                                                    occurred_at,
                                                    p2p_handle)
                values (gen_random_uuid(),
                        gen_random_uuid(),
                        random() * 100,
                        'p2p_payment',
                        'CAD',
                        (select NOW() + (random() * (NOW() + '10 days' - NOW()))),
                        '$mo');
            end loop;
    end;
$$;

do
$$
    begin
        for r in 0..10
            loop
                insert into "app_public".activities(canonical_id,
                                                    account_id,
                                                    amount,
                                                    type,
                                                    currency,
                                                    occurred_at,
                                                    spend_merchant,
                                                    fx_rate)
                values (gen_random_uuid(),
                        gen_random_uuid(),
                        random() * 100,
                        'prepaid',
                        'CAD',
                        (select NOW() + (random() * (NOW() + '10 days' - NOW()))),
                        'costco',
                        1.36);
            end loop;
    end;
$$;
