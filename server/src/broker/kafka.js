/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
const { Kafka, Partitioners, logLevel } = require('kafkajs');
const readline = require('readline');
const { EventModel } = require('../app/models');
const EventConsumer = require('./eventsConsumer');

const BrokerService = {
    ALL_TOPICS: {
        TOPIC_TRACK_USER_LOGIN: 'TOPIC.TRACK_USER_LOGIN',
        TOPIC_CONSUMED_MESSAGES: 'TOPIC.CONSUMED_MESSAGES',
    },
    TOPICS: [
        ...Object.values({
            TOPIC_TRACK_USER_LOGIN: 'TOPIC.TRACK_USER_LOGIN',
            TOPIC_CONSUMED_MESSAGES: 'TOPIC.CONSUMED_MESSAGES',
        }),
    ],
    kafkaConfig: {
        clientId: 'demo',
        brokers: ['0.0.0.0:9092'],
        logLevel: logLevel.ERROR, // DEBUG || WARN || ERROR
    },
    kafkaProducerConfig: {
        createPartitioner: Partitioners.LegacyPartitioner,
        allowAutoTopicCreation: false,
        transactionTimeout: 30000,
    },
    kafkaConsumerConfig: {
        groupId: 'demo-group',
    },

    _listenEvents: ['BANKING_ENGINE.PRIVILEGE_MARKET'],
    _kafka: null,
    _producer: null,
    _consumer: null,
    _admin: null,

    clearScreen() {
        const blank = '\n'.repeat(process.stdout.rows);
        console.log(blank);
        readline.cursorTo(process.stdout, 0, 0);
        readline.clearScreenDown(process.stdout);
        return this;
    },

    initProducer() {
        const producer = this._kafka.producer(this.kafkaProducerConfig);
        producer.on(producer.events.CONNECT, () => {
            console.log('==> producer', producer.events.CONNECT);
        });

        producer.on(producer.events.DISCONNECT, () => {
            console.log('==> producer', producer.events.DISCONNECT);
        });

        producer.on(producer.events.REQUEST, (InstrumentationEvent) => {
            console.log('==> producer', producer.events.REQUEST);
            if (InstrumentationEvent.payload.apiName === 'Produce') {
                console.log('==> producer [REQUEST]', InstrumentationEvent);
            }
        });
        producer.on(producer.events.REQUEST_TIMEOUT, () => {
            // console.log('==> producer', producer.events.REQUEST_TIMEOUT);
        });

        producer.on(producer.events.REQUEST_QUEUE_SIZE, () => {
            // console.log('==> producer', producer.events.REQUEST_QUEUE_SIZE);
        });

        return producer;
    },

    initConsumer() {
        const consumer = this._kafka.consumer(this.kafkaConsumerConfig);

        /** IMPORTANT EVENTS START  */
        consumer.on(consumer.events.CONNECT, (InstrumentationEvent) => {
            console.log('==> consumer', consumer.events.CONNECT);
        });
        consumer.on(consumer.events.START_BATCH_PROCESS, async (InstrumentationEvent) => {
            // console.log('==> consumer', consumer.events.START_BATCH_PROCESS);
            if (this.TOPICS.includes(InstrumentationEvent.payload.topic)) {
                console.log('==> consumer [START_BATCH_PROCESS]', InstrumentationEvent);
            }
        });
        consumer.on(consumer.events.END_BATCH_PROCESS, (InstrumentationEvent) => {
            // console.log('==> consumer', consumer.events.END_BATCH_PROCESS);
            if (this.TOPICS.includes(InstrumentationEvent.payload.topic)) {
                console.log('==> consumer [END_BATCH_PROCESS]', InstrumentationEvent);
            }
        });
        consumer.on(consumer.events.REQUEST, (InstrumentationEvent) => {
            console.log('==> consumer', consumer.events.REQUEST, InstrumentationEvent.payload.apiName);
        });
        consumer.on(consumer.events.COMMIT_OFFSETS, (InstrumentationEvent) => {
            console.log('==> consumer', consumer.events.COMMIT_OFFSETS);
            console.log('==> consumer [COMMIT_OFFSETS]', InstrumentationEvent.payload.topics);
            console.log('==> consumer [COMMIT_OFFSETS]', InstrumentationEvent.payload.topics[0].partitions[0].offset);
        });
        consumer.on(consumer.events.DISCONNECT, (InstrumentationEvent) => {
            console.log('==> consumer', consumer.events.DISCONNECT);
        });
        consumer.on(consumer.events.STOP, (InstrumentationEvent) => {
            console.log('==> consumer', consumer.events.STOP);
        });
        consumer.on(consumer.events.CRASH, (InstrumentationEvent) => {
            console.log('==> consumer', consumer.events.CRASH);
        });
        consumer.on(consumer.events.GROUP_JOIN, (InstrumentationEvent) => {
            console.log('==> consumer', consumer.events.GROUP_JOIN);
        });
        consumer.on(consumer.events.REBALANCING, (InstrumentationEvent) => {
            console.log('==> consumer', consumer.events.REBALANCING);
        });

        /** IMPORTANT EVENTS END  */

        /** NOT IMPORTANT EVENTS START  */
        // consumer.on(consumer.events.FETCH, (InstrumentationEvent) => {
        //     console.log('==> consumer', consumer.events.FETCH);
        // });
        // consumer.on(consumer.events.HEARTBEAT, (InstrumentationEvent) => {
        //     console.log('==> consumer', consumer.events.HEARTBEAT);
        // });

        // consumer.on(consumer.events.FETCH_START, (InstrumentationEvent) => {
        //     console.log('==> consumer', consumer.events.FETCH_START);
        // });

        // consumer.on(consumer.events.RECEIVED_UNSUBSCRIBED_TOPICS, (InstrumentationEvent) => {
        //     console.log('==> consumer', consumer.events.RECEIVED_UNSUBSCRIBED_TOPICS);
        // });
        // consumer.on(consumer.events.REQUEST_TIMEOUT, (InstrumentationEvent) => {
        //     console.log('==> consumer', consumer.events.REQUEST_TIMEOUT);
        // });
        // consumer.on(consumer.events.REQUEST_QUEUE_SIZE, (InstrumentationEvent) => {
        //     console.log('==> consumer', consumer.events.REQUEST_QUEUE_SIZE);
        // });

        return consumer;
    },

    initAdmin(options = {}) {
        const admin = this._kafka.admin();
        admin.on(admin.events.CONNECT, () => {
            console.log('==> event', admin.events.CONNECT);
        });
        admin.on(admin.events.DISCONNECT, () => {
            console.log('==> event', admin.events.DISCONNECT);
        });
        //   admin.on(admin.events.REQUEST, function () {
        //     console.log("==> event", admin.events.REQUEST);
        //   });
        admin.on(admin.events.REQUEST_TIMEOUT, () => {
            console.log('==> event', admin.events.REQUEST_TIMEOUT);
        });
        admin.on(admin.events.REQUEST_QUEUE_SIZE, () => {
            console.log('==> event', admin.events.REQUEST_QUEUE_SIZE);
        });

        return admin;
    },
    async runConsumer(options = {}) {
        // await this._consumer.connect();
        await this._consumer.subscribe({
            topics: this.TOPICS,
            fromBeginning: true,
        });
        this._consumer.run({
            eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
                console.log(
                    `** Message Recieved (1)- Offset ${message.offset} (2)- FirstOffset ${message.batchContext.firstOffset} (3)- Topic '${topic}' (4)- Partition ${partition} `
                );
                const eventId = message.key.toString();
                const eventPayload = JSON.parse(message.value.toString());

                if (EventConsumer[topic] && eventId) {
                    await EventConsumer[topic](eventPayload);
                    await EventModel.findOneAndUpdate(
                        { _id: eventId },
                        {
                            consume: {
                                consumeMetaData: { topic, partition, message },
                                consumedBy: process.env.APP_NAME,
                                consumedAt: new Date(),
                            },
                            status: 1,
                        }
                    );
                }
            },
        });
    },

    async produceMessage(options = {}) {
        if (!options.topicName) throw new Error(`Topic name is required.`);
        // this.clearScreen();
        await this._producer.connect();
        // let eventModel = new EventModel({
        //     eventName: options.topicName,
        //     eventPayload: options.payload,
        //     produce: {
        //         producedBy: process.env.APP_NAME,
        //         producedAt: new Date(),
        //     },
        //     status: 0,
        // });
        // eventModel = await eventModel.save();
        const [produceMetaData] = await this._producer.send({
            topic: options.topicName,
            messages: [
                {
                    key: eventModel._id.toString(), // payload
                    value: JSON.stringify(options.payload) || '{}',
                },
            ],
        });
        // eventModel = await EventModel.findOneAndUpdate(
        //     { _id: eventModel._id.toString() },
        //     { produce: { produceMetaData } }
        // );
        // console.log('eventModel', eventModel);

        console.log(
            `** Message Produced  (1)- Topic '${produceMetaData.topicName}' (2)-Partition ${produceMetaData.partition}  (3)- BaseOffset ${produceMetaData.baseOffset} (4)- ErrorCode ${produceMetaData.errorCode} ** `
        );
        await this._producer.disconnect();
    },

    /** ADMIN FUNCTIONS START */
    /**
 * 
 * 
{
    validateOnly: <boolean>,
    waitForLeaders: <boolean>
    timeout: <Number>,
    topics: <ITopicConfig[]>,
}
ITopicConfig
 {
    topic: <String>,
    numPartitions: <Number>,     // default: -1 (uses broker `num.partitions` configuration)
    replicationFactor: <Number>, // default: -1 (uses broker `default.replication.factor` configuration)
    replicaAssignment: <Array>,  // Example: [{ partition: 0, replicas: [0,1,2] }] - default: []
 }

 */

    async getTopics() {
        try {
            let existingTopics = await this._admin.listTopics();
            existingTopics = existingTopics.filter((topic) => !topic.includes('__') && !topic.includes('BANKING'));
            return existingTopics;
        } catch (err) {
            throw new Error(err);
        }
    },
    async createTopics() {
        try {
            const existingTopics = await this.getTopics();
            const unCreatedTopics = this.TOPICS.filter((i) => !existingTopics.includes(i));
            if (unCreatedTopics.length) {
                const topicsCreated = this.TOPICS.map((topic) => ({
                    topic,
                    numPartitions: -1,
                    replicationFactor: -1,
                    replicaAssignment: [],
                }));

                const isTopicCreateSuccess = await this._admin.createTopics({
                    validateOnly: false,
                    waitForLeaders: true,
                    timeout: 5000,
                    topics: topicsCreated,
                });
                if (isTopicCreateSuccess) {
                    console.log('>>> topicsCreated', topicsCreated);
                } else {
                    console.log('>>> Topic creation failed');
                }
            } else {
                console.log('>>> No topics need to be created');
            }
        } catch (err) {
            console.log('err', err);
        }
    },
    async deleteAllTopics() {
        try {
            const existingTopics = await this.getTopics();
            if (existingTopics.length) {
                await this._admin.deleteTopics({
                    topics: existingTopics,
                    timeout: 5000,
                });
                await new Promise((r) => setTimeout(r, 3000));
                console.log('>>> Topics delete success ', existingTopics);
            } else {
                console.log('>>> No topics to delete.');
            }
        } catch (err) {
            console.log('err', err);
        }
    },

    /** ADMIN FUNCTIONS START */

    async initBroker() {
        this._kafka = new Kafka(this.kafkaConfig);
        if (this._kafka) {
            this._producer = this.initProducer();
            this._consumer = this.initConsumer();
            this._admin = this.initAdmin();
            if (this._admin) {
                await this._admin.connect();
                // await this.deleteAllTopics();
                await this.createTopics();
                await this._admin.disconnect();
            }
        }
        return this;
    },

    async run() {
        try {
            console.log('>>> INIT BROKER SERVICE <<< ');
            const brokerService = await BrokerService.initBroker();
            // await brokerService.produceMessage({topicName:''});
            await brokerService.runConsumer();
            return this;
        } catch (err) {
            console.log('err.message ==>', err.message);
            console.log('err.stack   ==>', err.stack);
            // setTimeout(() => {
            //     console.log(`Retyring kafka connect is 5 sec. `);
            // }, 5000);
        }
    },
};
module.exports = BrokerService;
