import { RuleBuilder, Validator, validatorBuilder } from 'json-data-validator';

export const validator: Validator = validatorBuilder()
  .newRule()
  .withField('publicKey')
  .validate(
    RuleBuilder.isRequiredBy
      .withParent(
        'privateKey',
        'Both public key and private key must be specified. Leave both blank to generate them.'
      )
      .build()
  )
  .validate(RuleBuilder.matches('^[A-Za-z0-9_-]*$'))
  .withField('privateKey')
  .validate(
    RuleBuilder.isRequiredBy
      .withParent(
        'publicKey',
        'Both public key and private key must be specified. Leave both blank to generate them.'
      )
      .build()
  )
  .validate(RuleBuilder.matches('^[A-Za-z0-9_-]*$'))
  .withField('alias')
  .validate(
    RuleBuilder.required()
      .withErrorMessage('Please enter a valid URL or mailto address')
      .build()
  )
  .validate(
    RuleBuilder.composite
      .any()
      .withSubRule(
        RuleBuilder.matches(
          '^mailto: ?(?:[a-z0-9!#$%&\'*+\\/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+\\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])$'
        )
      )
      .withSubRule(
        RuleBuilder.isValidUrl()
          .requireTld(true)
          .requireHost(true)
          .requireProtocol(true)
          .build()
      )
      .build('Please enter a valid URL or mailto address')
  )
  .build();
