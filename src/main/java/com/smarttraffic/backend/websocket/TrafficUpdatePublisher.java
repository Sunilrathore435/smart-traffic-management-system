package com.smarttraffic.backend.websocket;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
public class TrafficUpdatePublisher {

    private final SimpMessagingTemplate messagingTemplate;

    public TrafficUpdatePublisher(
            SimpMessagingTemplate messagingTemplate) {

        this.messagingTemplate = messagingTemplate;
    }

    /**
     * Publish live traffic update.
     */
    public void publishTrafficUpdate(Object payload) {

        messagingTemplate.convertAndSend(
                "/topic/traffic",
                payload
        );
    }

    /**
     * Publish analytics update.
     */
    public void publishAnalyticsUpdate(Object payload) {

        messagingTemplate.convertAndSend(
                "/topic/analytics",
                payload
        );
    }

    /**
     * Publish history update.
     */
    public void publishHistoryUpdate(Object payload) {

        messagingTemplate.convertAndSend(
                "/topic/history",
                payload
        );
    }
}