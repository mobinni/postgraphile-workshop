do
$$
    begin
        for r in 0..10
            loop
                insert into "app_public".activities(canonical_id,
                                                    account_id,
                                                    amount,
                                                    currency,
                                                    type,
                                                    occurred_at,
                                                    spend_merchant,
                                                    fx_rate)
                values (gen_random_uuid(),
                        'account-123',
                        random() * 100,
                        'CAD',
                        'spend',
                        (select NOW() + (random() * (NOW() + '10 days' - NOW()))),
                        'costco',
                        1.36);
            end loop;
    end;
$$;
