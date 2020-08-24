import moment from 'moment';
import React, { Component } from 'react';
import { PushApplication } from '@aerogear/unifiedpush-admin-client';
import {
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStateVariant,
  Text,
  Label,
  Alert,
  Pagination,
  PaginationVariant,
} from '@patternfly/react-core';
import { TableIcon, ErrorCircleOIcon } from '@patternfly/react-icons';
import { UpsClientFactory } from '../../../utils/UpsClientFactory';
import { FlatPushMessageInformation } from '@aerogear/unifiedpush-admin-client/dist/src/commands/metrics/LoadMetricsCommand';
import { Title } from '../../../common/Title';
import {
  Table,
  TableHeader,
  TableBody,
  ICell,
  IRow,
  expandable,
} from '@patternfly/react-table';
import { EllipsisText } from '../../../common/EllipsisText';
import { CodeSnippet } from '../CodeSnippet';

interface Props {
  app: PushApplication;
}

interface State {
  loading: boolean;
  log: FlatPushMessageInformation[];
  columns: ICell[];
  rows: IRow[];
  total: number;
  currentPage: number;
  perPage: number;
}

export class ActivityLogPanel extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      currentPage: 1,
      perPage: 10,
      loading: true,
      total: 0,
      log: [],
      columns: [
        { title: 'Message', cellFormatters: [expandable] },
        { title: 'IP Address' },
        { title: 'Status' },
        { title: 'Sent' },
      ],
      rows: [],
    };

    this.onCollapse = this.onCollapse.bind(this);
  }

  loadActivityLog = async (page = 0) => {
    const makeDetail = (
      message: string,
      metric: FlatPushMessageInformation
    ): React.ReactNode => {
      let errorElement = <></>;

      if (metric.errors && metric.errors[0]) {
        errorElement = (
          <Alert
            isInline
            variant="warning"
            title={`Variant ${metric.errors![0].variant.name} has failed`}
          >
            {metric.errors![0].errorReason}
          </Alert>
        );
      }

      return (
        <>
          {errorElement}
          <CodeSnippet
            language="json"
            snippet={JSON.stringify(message, null, 2)}
          ></CodeSnippet>
        </>
      );
    };

    const metrics = await UpsClientFactory.getUpsClient()
      .applications.metrics(this.props.app.pushApplicationID)
      .withPageSize(this.state.perPage)
      .withPage(page)
      .execute();

    const rows = metrics.list.flatMap((metric, index) => {
      const message = JSON.parse(metric.rawJsonMessage);
      return [
        {
          isOpen: false,
          cells: [
            <>
              <EllipsisText message={message.alert} maxLength={15} />
            </>,
            metric.ipAddress,
            <>
              {metric.errors && metric.errors.length > 0 ? (
                <Label icon={<ErrorCircleOIcon />} color="red">
                  Failed
                </Label>
              ) : (
                <Label color="green">Processed</Label>
              )}
            </>,
            moment(metric.submitDate).format('d MMM, HH:mm:ss, yyyy'),
          ],
        },
        {
          parent: index * 2,
          fullWidth: true,
          cells: [<>{makeDetail(message, metric)}</>],
        },
      ];
    });

    const total = metrics.total;

    this.setState({ rows, total });
  };

  componentWillMount = () => {
    this.loadActivityLog();
  };

  onCollapse(event: React.MouseEvent, rowKey: number, isOpen: boolean) {
    const { rows } = this.state;
    /**
     * Please do not use rowKey as row index for more complex tables.
     * Rather use some kind of identifier like ID passed with each row.
     */
    rows[rowKey].isOpen = isOpen;
    this.setState({
      rows,
    });
  }

  render = () => {

    const noDevices = ()=> {
      console.log(this.props.app);
      return !(this.props.app.variants?.find((variant)=> {
        return variant.metadata && variant.metadata!.deviceCount > 0;
      }));
    }

    const noMessages = ()=> {
      return this.state.rows.length === 0;
    }

    if (noDevices()) {
      return (<>
        <EmptyState variant={EmptyStateVariant.full}>
          <EmptyStateIcon icon={TableIcon} />
          <Title>You have no devices registered</Title>
          <EmptyStateBody>
            There are no registered devices for this application.
            <br />
            Check out the documentation on how to get started to{' '}
            <a href="https://aerogear.org/getstarted/guides/#push">
              register a device
            </a>
            .
          </EmptyStateBody>
        </EmptyState>
      </>);
    } else if (noMessages()) {
      return (
        <>
          <EmptyState variant={EmptyStateVariant.full}>
            <EmptyStateIcon icon={TableIcon} />
            <Title>You have not sent a message</Title>
            <EmptyStateBody>
              No messages have been sent for this application.
              <br />
              Check out the documentation on how to get started to{' '}
              <a href="https://aerogear.org/getstarted/guides/#push">
                register a device
              </a>
              .
            </EmptyStateBody>
          </EmptyState>
        </>
      );
    } else {
      return (
        <>
          <Title>Notification activity</Title>
          <Text component={'small'}>
            Explore push messages that you have sent to the registered devices.
          </Text>
          <Table
            cells={this.state.columns}
            rows={this.state.rows}
            onCollapse={this.onCollapse}
            className={'activityTable'}
          >
            <TableHeader />
            <TableBody />
          </Table>
          <Pagination
            itemCount={this.state.total}
            perPage={this.state.perPage}
            widgetId="pagination-options-menu-bottom"
            page={this.state.currentPage}
            variant={PaginationVariant.bottom}
            onNextClick={(_event, currentPage) => {
              this.setState({ currentPage });
              console.log(currentPage);
              this.loadActivityLog(currentPage - 1);
            }}
            onPreviousClick={(_event, currentPage) => {
              this.setState({ currentPage });
              this.loadActivityLog(currentPage - 1);
              console.log(currentPage);
            }}
            onFirstClick={() => {
              this.setState({ currentPage: 1 });
              this.loadActivityLog(0);
            }}
            onLastClick={() => {
              this.setState({ currentPage: Math.ceil(this.state.total / 10) });
              this.loadActivityLog(Math.ceil(this.state.total / 10) - 1);
            }}
            onPerPageSelect={(event, perPage, currentPage) => {
              this.setState({ currentPage, perPage }, () =>
                this.loadActivityLog(currentPage - 1)
              );
            }}
          />
        </>
      );
    }
  };
}
